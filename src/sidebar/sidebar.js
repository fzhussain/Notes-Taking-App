import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

class SidebarComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            addingNote: false,
            title: null
        };
    }
    render() {
        const { notes, classes, selectedNoteIndex } = this.props;

        if(notes) {
            return(
                <div className={classes.sidebarContainer}>
                    <Button
                        onClick = {this.newNoteBtnClick}
                        className={classes.newNoteBtn}
                    >
                    { this.state.addingNote? 'Cancel': 'New Note' }
                    </Button> 
                    {
                        // Ability to add a new Note
                        this.state.addingNote ? 
                        <div>
                            <input type='text'
                                   className={classes.newNoteInput}
                                   placeholder='Enter Note Title'
                                   onKeyUp = {(e) => this.updateTitle(e.target.value)}
                                   ></input>
                            <Button 
                                className={classes.newNoteSubmitBtn}
                                onClick={this.newNote}
                            >Submit Note</Button>
                        </div>
                        : null
                    }
                    <List>
                        {
                            notes.map((_note, _index) => {
                                return (
                                    <div key={_index}>
                                        <SidebarItemComponent
                                            _note = { _note }
                                            _index = { _index }
                                            selectedNoteIndex = {selectedNoteIndex }
                                            selectNote = { this.selectNote }
                                            deleteNote = { this.deleteNote }
                                        ></SidebarItemComponent>
                                        <Divider></Divider>
                                    </div>
                                );
                            })
                        }
                    </List>
                </div>
                );
        } else {
            return (<div></div>);
        }

        
    }
    newNoteBtnClick = () => {
        console.log('New-Note Button clicked');
        this.setState({ title: null, addingNote: !this.state.addingNote });
    };
    updateTitle = (text) => {
        // console.log("Here it is ->", text);
        this.setState({title: text});
    };
    newNote = () => {
        // console.log(this.state);
        this.props.newNote(this.state.title);
        this.setState({title: null, addingNote: false});
    };
    selectNote = (n, i) => {
        // console.log('Select Note');
        this.props.selectNote(n, i);
    };
    deleteNote = (note) => {
        // console.log('Delete Note');
        this.props.deleteNote(note);
    };
}

export default withStyles(styles)(SidebarComponent);