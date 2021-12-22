import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { useSelector } from 'react-redux';
import bunqLogo from '../../images/bunq.svg'
import { createMessage, createOneToOneConversation, getMessageListing } from '../../api'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const Chat = () => {
    const classes = useStyles();
    const users = useSelector(state => state.reducer.users);
    const [searchedUsers, setsearchedUsers] = useState(useSelector(state => state.reducer.users));
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState({});
    const [conversationDetails, setConversationDetails] = useState([]);

    const selectedUser = useSelector(state => state.reducer.selectedUser);
    useEffect(() => {
        let removedUsers = searchedUsers;
        removedUsers = removedUsers.filter(function (obj) {
            return obj.name !== selectedUser.name;
        });
        setsearchedUsers(removedUsers);
    }, []);

    const handleChange = (value) => {
        let val = value.toLowerCase();
        let matches = users.filter(user => user.name.toLowerCase().includes(val));
        setsearchedUsers(matches);

    }
    const handleMessageChanges = (event) => {
        setMessage(event.target.value);
    };
    const handleClickUser = (user) => {
        const data = {
            user_ids: [
                user.id
            ]
        }
        createOneToOneConversation(selectedUser.id, data).then(response => {
            setConversation(response.data.data);
            getMessageListing(selectedUser.id, response.data.data.id).then(res => {
                setConversationDetails(res.data.data);

            })
        })
    };
    const sendMessages = () => {
        const data = {
            text: message
        }
        createMessage(selectedUser.id, conversation.id, data).then(() => {

            getMessageListing(selectedUser.id, conversation.id).then(res => {
                setConversationDetails(res.data.data);

            })
        })
        setMessage('');

    };
    return (
        <div>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" >Bunq Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key={selectedUser.id}>
                            <ListItemIcon>
                                <Avatar src={bunqLogo} />
                            </ListItemIcon>
                            <ListItemText primary={selectedUser.name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth
                            onChange={(event) => handleChange(event.target.value)} />
                    </Grid>
                    <Divider />
                    <List>
                        {searchedUsers.map((user) => (

                            <ListItem button key={user.id} onClick={() => handleClickUser(user)}>
                                <ListItemIcon>
                                    <Avatar src={bunqLogo} />
                                </ListItemIcon>
                                <ListItemText primary={user.name}>{user.name}</ListItemText>
                                <ListItemText secondary={new Date(user.last_seen_at).toUTCString()} align="right"></ListItemText>
                            </ListItem>

                        ))}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List key={conversation.id} className={classes.messageArea}>
                        {conversationDetails.map((conversation) => (

                            <ListItem key={conversation.id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align={conversation.user_id === selectedUser.id ? 'left' : 'right'}
                                            primary={conversation.text}></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align={conversation.user_id === selectedUser.id ? 'left' : 'right'}
                                            secondary={new Date(conversation.sent_at).toUTCString()}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something"
                                fullWidth value={message}
                                onChange={handleMessageChanges}
                            />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab onClick={sendMessages} color="primary" aria-label="add">Send</Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;