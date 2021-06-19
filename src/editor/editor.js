import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            title: '',
            id: ''
        };
    }

    componentDidMount = () =>{
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        });
    }

    componentDidUpdate = () => {
        if(this.props.selectedNote.id !== this.state.id) {
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            });
        }
    }


    render() {
        const { classes } = this.props;
        return(
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input
                className={classes.titleInput}
                placeholder='Note Title...'
                value={this.state.title? this.state.title: '' }
                onChange={(e) => this.updateTitle(e.target.value) }
                ></input>
                <ReactQuill 
                    value={ this.state.text } 
                    onChange={ this.updateBody }>
                </ReactQuill>
            </div>
        );
    }
    updateBody = async (val) => {
        await this.setState({text: val});
        this.update();
    };
    updateTitle = async (text) => {
        await this.setState({title: text});
        this.update();
    }
    update = debounce(() => {
        // console.log('Updating Database...');
        this.props.noteUpdate(this.state.id, {
            title: this.state.title,
            body: this.state.text
        })
        // Come back later
    }, 1500);
}


export default withStyles(styles)(EditorComponent)

/* 
1. withStyles - styles is passed to withStyles() and will immediately return a function which gets the parameter EditorComponent
2. styles- is a function which is written in styles.js
3. this.props.classes.ClassName
4. ReactQuill- is the text editor
5. debounce - is our helper.                    !important
            - What we don't want -> every time the user types in a letter, it is going to make a http request 
                                    everytime.
            - What we want -> We want to wait for the user to stop typing for 1.5s before it call the database. So this way is efficient with our resources. So, this is called debouncing.
6. componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
7. componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.
8. async - returns a promise.
9. await - waits for the promise to get resolved.
            
*/