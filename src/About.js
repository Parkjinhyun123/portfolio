import "./About.css";
import Card from "./Card";

function About() {
  return (
    <>
      <div className="About-container">
        <div className="About-head">ABOUT</div>
        <div className="About">
          <div className="Card-container">
            <Card icon="user" name="Name" content="박진현" />
            <Card icon="phone" name="Phone" content="010-8765-7954" />
            <Card icon="envelope" name="E-Mail" content="pjh1454@naver.com" />
            <Card icon="calendar" name="Birth" content="97.12.09" />
            <Card icon="pencil" name="DW Academy" content="23.08~24.02" />
            <Card
              icon="pencil"
              name="고려사이버대학교 소프트웨어 공학과"
              content="24.08~"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
