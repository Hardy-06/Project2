import { IonInfiniteScrollCustomEvent } from "@ionic/core";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import { api_origin } from "../api";
// import { Link, NavLink, useHistory } from "react-router-dom";
import useGet from "../hooks/useGet";
import "./ShopList.css";

type ShopListProps = {
  id: number;
  name: string;
  image: string;
  address: string;
};
type shopListPayload = {
  error?: string;
  shopList?: ShopListProps[];
};

function ShopList(props: {
  searchText?: string;
  type?: string;
  area?: string;
}) {
  const [hasLoadMore, setHasLoadMore] = useState(false);

  let query = {};
  if (props.searchText) {
    query = { ...query, searchText: props.searchText };
    // console.log(query);
  }
  if (props.type) {
    query = { ...query, shopType: props.type };
    // console.log(query);
  }
  if (props.area) {
    query = { ...query, area: props.area };
    // console.log(query);
  }
  const shopList = useGet<shopListPayload>({
    name: "shopList",
    pathname: "/shopList",
    query: query,
    defaultValue: {},
    shouldAutoReload: (json) => {
      return !hasLoadMore;
    },
  });

  // console.log("state:", shopList.state);

  async function loadMore(ev: IonInfiniteScrollCustomEvent<void>) {
    const offset = shopList.state.payload.shopList?.length || 0;

    let json = await shopList.loadMore(offset);
    // console.log("load more:", json);
    // console.log("state:", shopList.state);
    if (json.error) {
    }
    if (json.shopList) {
      shopList.setState((state) => ({
        ...state,
        payload: {
          shopList: [...(state.payload.shopList || []), ...json.shopList],
        },
      }));
      setHasLoadMore(true);
    }
    ev.target.complete();
  }
  return (
    <>
      {shopList.render((json) => (
        <>
          <IonGrid>
            <IonRow>
              {json.shopList?.map((shop, idx) => (
                <IonCol key={idx} size="12">
                  <IonCard className="no-margin" href={`/shop/${shop.id}`}>
                    <img
                      className="shopList-image"
                      src={`${api_origin}/${shop.image}`}
                    ></img>
                    <IonCardHeader className="no-padding">
                      <IonCardTitle className="shop-title">
                        {shop.name}
                      </IonCardTitle>
                      <IonCardSubtitle className="shop-subtitle">
                        {shop.address}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))}
              <IonInfiniteScroll onIonInfinite={loadMore}>
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </IonRow>
          </IonGrid>
        </>
      ))}
    </>
  );
}

export default ShopList;
