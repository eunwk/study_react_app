import React, { useState } from "react";
import { Button, Empty } from "antd";
import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import Styles from "./HomeStyles";
import MessageBox from "../components/MessageBox";

function Home() {
  const [micOnOff, setMicOnOff] = useState(true);
  const handleMicToggle1 = () => {
    setMicOnOff(!micOnOff);
  };

  const [micState, setMicState] = useState(true);
  const handleMicToggle2 = () => {
    setMicState(!micState);
  };

  return (
    <Styles>
      adsfsdfas
      <div className="item">
        <h1 className="tit">버튼 아이콘 토글</h1>
        <Button
          className="lnb-btn"
          icon={micOnOff ? <AudioOutlined /> : <AudioMutedOutlined />}
          onClick={handleMicToggle1}
        />
      </div>

      <div className="item">
        <h1 className="tit">버튼 클래스 토글</h1>
        <button
          onClick={handleMicToggle2}
          className={`btn${micState ? "" : " active"}`}
        >
          클래스 토글
        </button>
      </div>

      <div className="item">
        <h1 className="tit">Wrapper Node(MessageBox)</h1>
        <MessageBox>
          <Empty description="초대받은 회의 정보가 없습니다." />
        </MessageBox>
      </div>
    </Styles>
  );
}
export default Home;
