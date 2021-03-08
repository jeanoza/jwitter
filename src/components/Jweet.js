import { dbService, storageService } from "fbase";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid rgb(255, 255, 255);
  margin-bottom: 20px;
  border-radius: 15px;
  padding: 5px;
`;
const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  word-break: break-all;
  padding: 10px 5px;
`;
const Date = styled.div`
  width: 100%;
  padding: 0px 5px;
  padding-bottom: 10px;
  color: rgb(100, 100, 100);
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  object-fit: cover;
  bottom: -10px;
  right: 0px;
  border-radius: 25px;
`;
const ButtonList = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  padding: 10px;
  padding-top: 0px;
  color: #289ae2;
`;
const Form = styled.form`
  width: 100%;
  word-break: break-all;
  display: flex;
  justify-content: space-between;
`;

const TextArea = styled.textarea`
  all: unset;
  width: 100%;
  cursor: text;
  padding: 10px 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Input = styled.input`
  display: none;
`;
const UpdateLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  border-radius: 20px;
  margin: 5px;
  background-color: #289ae2;
`;
const CancelButton = styled.button`
  padding: 10px;
  border-radius: 20px;
  margin: 5px;
  background-color: #289ae2;
`;

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this Jweet ? ");
    if (ok) {
      dbService.doc(`jweets/${jweetObj.id}`).delete();
      storageService.refFromURL(jweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`jweets/${jweetObj.id}`).update({
      text: newJweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };
  return (
    <>
      {editing ? (
        <Container>
          <Form onSubmit={onSubmit}>
            <TextArea
              placeholder="Edit your Jweet"
              required
              onChange={onChange}
              value={newJweet}
            />
            <ButtonList>
              <UpdateLabel htmlFor="update">
                <FontAwesomeIcon icon={faPaperPlane} />
              </UpdateLabel>
              <Input id="update" type="submit" />
              <CancelButton onClick={toggleEditing}>
                <FontAwesomeIcon icon={faBan} />
              </CancelButton>
            </ButtonList>
          </Form>
        </Container>
      ) : (
        <Container>
          <Text>
            {jweetObj.text}
            {isOwner && (
              <ButtonList>
                <Button onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
                <Button onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </ButtonList>
            )}
          </Text>
          <Date>
            By {jweetObj.creatorName} at{" "}
            {window.Date(jweetObj.createdAt).substring(0, 21)}
          </Date>

          {jweetObj.attachmentUrl && <Image src={jweetObj.attachmentUrl} />}
        </Container>
      )}
    </>
  );
};
export default Jweet;
