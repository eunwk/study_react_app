import React from "react";
// import { Space } from "antd";
import Styles from "./FunctionComponentStyles";
import GuGuDanFunc from "../components/game/GuGuDanFunc";
import WordRelayFunc from "../components/game/WordRelayFunc";
import BaseballFunc from "../components/game/BaseballFunc";
import LifeCycleFunc from "../components/game/LifeCycleFunc";
import PropsTransmissionFunc from "../components/game/PropsTransmissionFunc";
import ReactionRateFunc from "../components/game/ReactionRateFunc";
import RSPFunc from "../components/game/RSPFunc";
import LottoFunc from "../components/game/LottoFunc";
import TicTacToeFunc from "../components/game/TicTacToeFunc";
import MineSearchFunc from "../components/game/MineSearchFunc";

export const FunctionComponent = () => {
    return (
        <Styles>
            <div className="item">
                <GuGuDanFunc />
              </div>
              <div className="item">
                <WordRelayFunc />
              </div>
              <div className="item">
                <BaseballFunc />
              </div>
              <div className="item">
                <LifeCycleFunc />
              </div>
              <div className="item">
                <PropsTransmissionFunc />
              </div>
              <div className="item">
                <ReactionRateFunc />
              </div>
              <div className="item">
                <RSPFunc />
              </div>
              <div className="item">
                <LottoFunc />
              </div>
              <div className="item">
                <TicTacToeFunc />
              </div>
              <div className="item">
                <MineSearchFunc />
              </div>
        </Styles>
    );
}

export default FunctionComponent;
