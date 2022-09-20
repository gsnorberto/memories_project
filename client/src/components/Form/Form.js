import React, { useState, useEffect } from 'react'; 
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentID }) => {
   const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); // reducers

   const classes = useStyles();
   const dispatch = useDispatch();

   const [postData, setPostData] = useState({
      creator: '', title: '', message: '', tags: '', selectedFiles: '', 
   });

   useEffect(() => {
      if(post) setPostData(post);
   }, [post]);

   const handleSubmit = (e) => {
      e.preventDefault();

      if(currentId){ // updatePost
         dispatch(updatePost(currentId, postData));

      } else { // createPost
         dispatch(createPost(postData));
      }

   }

   const clear = () => {

   }

   return (
      <Paper className={classes.paper}>
         <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography>Criar uma Memória</Typography>
            <TextField
               name='creator'
               variant='outlined'
               label="Criador"
               fullWidth
               value={postData.creator}
               onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
            />
            <TextField
               name='title'
               variant='outlined'
               label="Título"
               fullWidth
               value={postData.title}
               onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
            <TextField
               name='message'
               variant='outlined'
               label="Mensagem"
               fullWidth
               value={postData.message}
               onChange={(e) => setPostData({ ...postData, message: e.target.value })}
            />
            <TextField
               name='tags'
               variant='outlined'
               label="Tags"
               fullWidth
               value={postData.tags}
               onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
            />
            <div className={classes.fileInput}>
               <FileBase64
                  type="file"
                  multiple={false}
                  onDone = {({base64}) => setPostData({ ...postData, selectedFile: base64})}
               />
            </div>
            <Button
               className={classes.buttonSubmit}
               variant='contained'
               color='primary'
               size='large'
               type='submit'
               fullWidth
            > Enviar </Button>

            <Button
               variant='contained'
               color='secondary'
               size='small'
               onClick={clear}
               fullWidth
            > Cancelar </Button>
         </form>
      </Paper>
   )
}

export default Form