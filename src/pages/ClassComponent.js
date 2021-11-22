import React from "react";
import Styles from "./ClassComponentStyles";
import GuGuDanClass from "../components/game/GuGuDanClass";
import WordRelayClass from "../components/game/WordRelayClass";
import BaseballClass from "../components/game/BaseballClass";
import LifeCycleClass from "../components/game/LifeCycleClass";
import PropsTransmissionClass from "../components/game/PropsTransmissionClass";
import ReactionRateClass from "../components/game/ReactionRateClass";
import RSPClass from "../components/game/RSPClass";
import LottoClass from "../components/game/LottoClass";



export const ClassComponent = () => {
    return (
        <Styles>
              <div className="item">
                <GuGuDanClass />
              </div>
              <div className="item">
                <WordRelayClass />
              </div>
              <div className="item">
                <BaseballClass />
              </div>
              <div className="item">
                <LifeCycleClass />
              </div>
              <div className="item">
                <PropsTransmissionClass />
              </div>
              <div className="item">
                <ReactionRateClass />
              </div>
              <div className="item">
                <RSPClass />
              </div>
              <div className="item">
                <LottoClass />
              </div>
              
           
        </Styles>
    );
}

export default ClassComponent;
