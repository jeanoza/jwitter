import { dbService, storageService } from "fbase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  /* border: 1px solid rgb(255, 255, 255); */
  border-radius: 20px;
`;
const Input = styled.input`
  display: none;
`;
const InputText = styled.input`
  width: 100%;
  font-size: 15px;
  cursor: text;
  &::placeholder {
    font-size: 15px;
  }
`;
const Tab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
`;
const TextTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  padding: 5px;
  border: 1px solid #289ae2;
  border-radius: 20px;
`;
const Clear = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #289ae2;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
const AttachLabel = styled.label`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #289ae2;
  padding: 5px 0px;
`;
const SubmitLabel = styled.label`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: #289ae2;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JweetFactory = ({ userObj }) => {
  const [jweet, setJweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    if (jweet === "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const jweetObj = {
      text: jweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      attachmentUrl,
    };
    await dbService.collection("jweets").add(jweetObj);
    setJweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };
  const onClearAttachment = () => {
    setAttachment(null);
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextTab>
        <InputText
          onChange={onChange}
          value={jweet}
          type="text"
          placeholder="What do you think now?"
          max={120}
        />
        <SubmitLabel htmlFor="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </SubmitLabel>
        <Input id="submit" type="submit" value="Jweet" />
      </TextTab>
      <AttachLabel htmlFor="attach-file">
        <FontAwesomeIcon icon={faPlus} />
        <span>Add Photo </span>
      </AttachLabel>
      <Input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      {attachment && (
        <Tab>
          <Image src={attachment} />
          <Clear onClick={onClearAttachment}>
            <FontAwesomeIcon icon={faTrashAlt} size="1x" />
          </Clear>
        </Tab>
      )}
    </Form>
  );
};
export default JweetFactory;
