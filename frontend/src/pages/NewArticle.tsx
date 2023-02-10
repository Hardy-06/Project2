// import "./Article.css";
// import { Editor } from "../components/Editor";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { useState } from "react";
import useCropper from "../hooks/useCropper";
import useEditor from "../hooks/useEditor";
// import parse from "html-react-parser";
import { useUserID } from "../redux/selector";
import ToastController from "../hooks/useToast";
import { fetchNonGetData } from "../api";
import { useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";
type ArticleProps = {
  data?: any;
};

function NewArticle(props: {
  setIsOpenNewArticle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState<string>("");
  const history = useHistory();
  let toast = ToastController();
  const userID = useUserID();
  const { upload } = useFetch();
  // const userID = 1;
  const editor = useEditor();
  const cropper = useCropper();
  if (!userID) {
    toast.showError("Pls login first");
  }
  async function submitArticle() {
    const formData = new FormData();
    // console.log(cropper.mainImage);
    // console.log(editor.textValue);
    // console.log(title);
    if (!cropper.mainImage || !editor.textValue || !title) {
      return toast.showError("Missing Information");
    }
    formData.append("image", cropper.mainImage);
    let image = await upload("POST", "/contextImg", formData);
    console.log(image);
    if (image.url) {
      try {
        let result = await fetchNonGetData("/newArticle", "POST", {
          users_id: userID,
          title: title,
          main_img: image.url,
          html_content: editor.textValue,
        });
        console.log(result);
        if (result.id) {
          toast.showSuccess("new article added successfully");
          setTimeout(() => {
            props.setIsOpenNewArticle(false);
            history.push("/article/" + result.id);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        return toast.showError("Failed to add article");
      }
    }
  }

  return (
    <>
      <IonPage>
        {/* {userID ? ( */}
        <IonContent fullscreen>
          <IonList>
            <IonItem>
              <IonLabel>文章標題</IonLabel>
              {
                <IonInput
                  type="text"
                  placeholder="輸入..."
                  onIonChange={(e) => setTitle(e.detail.value!)}
                ></IonInput>
              }
            </IonItem>
            <IonItem>{cropper.code}</IonItem>
          </IonList>
          {editor.code}
          {/* {parse(editor.textValue)} */}
        </IonContent>
        <IonButton onClick={submitArticle}>Submit</IonButton>
        {/* ) : null} */}
        {/* <IonButton onClick={() => console.log(editor.save)}></IonButton> */}
      </IonPage>
    </>
  );
}

export default NewArticle;
