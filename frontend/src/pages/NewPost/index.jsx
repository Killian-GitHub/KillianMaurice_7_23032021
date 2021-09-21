import styled from 'styled-components'

import '../../styles/fas-logo.css'

const PostContainer = styled.div`
  width: 75%;
  height: 80px;
  padding-bottom: 20px;
  margin: 0 auto;
  text-align: center;
`
const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
const PostButton = styled.button`
  padding-top: 10px;
  width: 15%;
  & p {
    font-weight: 14px;
    margin-top: 7px;
  }
`
const PostForm = styled.form`
  width: 100%;
`
const PostInput = styled.input`
  width: 95%;
  background-color: #f2f2f2;
  border: solid 0.2px;
  border-radius: 2px;
  height: 95%;
  padding-left: 10px;
`

function NewPost() {
  return (
    <PostContainer>
      <p>Ajoutez une nouvelle publication :</p>
      <InputContainer>
        <PostButton>
          <i className="fas fa-camera post-icon"></i>
          <p>Ajouter une image</p>
        </PostButton>
        <PostForm action="new-post" method="post" className="new-post_form">
          <PostInput
            type="text"
            name="post-input"
            id="post-input"
            class="input-champ"
            placeholder="Entrez votre nouvelle publication"
            required
          />
        </PostForm>
        <PostButton>
          <i class="fas fa-share post-icon"></i>
          <p>Ajouter une publication</p>
        </PostButton>
      </InputContainer>
    </PostContainer>
  )
}

export default NewPost
