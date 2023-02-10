import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { eye, heart } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api_origin, fetchData, fetchNonGetData } from "../api";
import parse from "html-react-parser";
import { useUserID } from "../redux/selector";
import useLikeCollection from "../hooks/useLikeCollect";
import { routes } from "../Routes";

type articleDetailProps = {
  author_id: number;
  author: string;
  title: string;
  main_img: string;
  html_content: string;
  views: number;
  created_at: string;
  like_qty: number;
};

function Article() {
  const params = useParams<{ id: string }>();
  const users_id = useUserID();
  const likeCollectArticle = useLikeCollection("Article", users_id, params.id);
  const { liked, likeCode, collectCode, alertFunction } = likeCollectArticle;
  if (!params.id) {
    alertFunction("FAILED", "NO ARTICLE FOUND");
  }

  //   console.log(articleId);
  const [articleDetail, setArticleDetail] = useState<articleDetailProps>();
  // const [presentAlert] = useIonAlert();

  useEffect(() => {
    (async () => {
      let data = await fetchData(`/ArticleDetail/${params.id}`);
      setArticleDetail(data);
      //   console.log(data);
    })();
  }, [liked, params]);

  useEffect(() => {
    (async () => {
      await fetchNonGetData(`/addViews/${params.id}`, "POST", {});
    })();
  }, []);

  // function alertFunction(header: string, message: string, subHeader?: string) {
  //   presentAlert({
  //     header: header,
  //     message: message,
  //     subHeader: subHeader || "Important message",
  //     buttons: ["OK"],
  //   });
  // }
  // async function likeFunction() {
  //   if (!users_id) {
  //     alertFunction("FAILED", "PLEASE LOGIN FIRST!");
  //     return;
  //   }
  //   if (!liked) {
  //     let result = await fetchNonGetData("/likeArticle", "POST", {
  //       users_id,
  //       article_id: params.id,
  //     });
  //     //   console.log(result);
  //     if (result.success) {
  //       setLiked(true);
  //     } else {
  //       alertFunction("FAILED", "FAILED TO LIKE THE ARTICLE!");
  //     }
  //   } else {
  //     let result = await fetchNonGetData("/likeArticle", "DELETE", {
  //       users_id,
  //       article_id: params.id,
  //     });
  //     //   console.log(result);
  //     if (result.success) {
  //       setLiked(false);
  //     } else {
  //       alertFunction("FAILED", "FAILED TO UNLIKE THE ARTICLE!");
  //     }
  //   }
  //   return;
  // }

  // async function collectFunction() {
  //   if (!users_id) {
  //     alertFunction("FAILED", "PLEASE LOGIN FIRST!");
  //     return;
  //   }
  //   if (!collected) {
  //     let result = await fetchNonGetData("/articleCollection", "POST", {
  //       users_id,
  //       article_id: params.id,
  //     });
  //     //   console.log(result);
  //     if (result.success) {
  //       setCollected(true);
  //     } else {
  //       alertFunction("FAILED", "FAILED TO LIKE THE ARTICLE!");
  //     }
  //   } else {
  //     let result = await fetchNonGetData("/articleCollection", "DELETE", {
  //       users_id,
  //       article_id: params.id,
  //     });
  //     if (result.success) {
  //       setCollected(false);
  //     } else {
  //       alertFunction("FAILED", "FAILED TO UNLIKE THE ARTICLE!");
  //     }
  //   }
  //   return;
  // }
  //   console.log(articleDetail);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton href={routes.tab.Main}>Back</IonButton>
          </IonButtons>
          <IonTitle>文章詳情</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {articleDetail ? (
          <>
            <IonImg
              src={`${api_origin}/uploads/${articleDetail.main_img}`}
            ></IonImg>
            <IonRow class="ion-justify-content-end ion-align-items-center">
              {collectCode}
              {likeCode}
              {articleDetail.like_qty}
              <IonIcon color="primary" size={"large"} icon={eye}></IonIcon>
              {articleDetail.views | 0}
            </IonRow>
            <div>
              <div>
                <div className="ion-padding">
                  <IonLabel color="warning">
                    <h1>{articleDetail.title}</h1>
                  </IonLabel>
                  <div className="d-flex ion-justify-content-between flex1">
                    <IonLabel color="medium">
                      <h3>
                        {articleDetail.author} -
                        {new Date(articleDetail.created_at)
                          .toDateString()
                          .slice(3)}
                      </h3>
                    </IonLabel>
                  </div>
                </div>
              </div>
              <div className="ion-margin-top ion-padding">
                <IonLabel>{parse(articleDetail.html_content)}</IonLabel>
              </div>
            </div>
          </>
        ) : null}
      </IonContent>
    </IonPage>
  );
}

export default Article;
