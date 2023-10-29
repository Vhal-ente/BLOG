import { styled } from "styled-components";
import blog from "../../assets/blog.jpeg";

const ContainerSection = styled.section`
  display: flex;
  flex-direction: row;
  height: 500px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  background-color: #2d8bde;
  color: white;
  font-family: "Courier New", Courier, monospace;
  @media only screen and (max-width: 768px) {
    .image-wrapper {
      display: none;
    }
  }
`;
const ContentSection = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 40px;
  padding-top: 30px;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    width: 90%;
    padding-left: 0;
    padding-top: 0;
    margin: auto;
  }

  h1 {
    font-size: 60px;
    font-weight: bolder;
    margin-bottom: 0;
  }
  p {
    font-size: 24px;
  }

  a {
    text-decoration: none;
    background-color: white;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    width: 130px;
    text-align: center;
    font-weight: bold;
  }
`;

const Hero = () => {
  return (
    <>
      <ContainerSection>
        <ContentSection>
          <h1>Stay Curious. </h1>
          <p>
            Discover stories, thinking, and expertise from writers on any topic.{" "}
          </p>
          <a href="#">Explore Now</a>
        </ContentSection>
        <img src={blog} alt="Blog image" className="image-wrapper" />
      </ContainerSection>
    </>
  );
};

export default Hero;
