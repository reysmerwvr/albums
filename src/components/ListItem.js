import React, { Component } from 'react';
import { 
    Text,
    StyleSheet, 
    TouchableWithoutFeedback, 
    View,
    LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
    
    componentWillUpdate() {
        LayoutAnimation.spring();    
    }
    
    renderDescription() {
        const { library, expanded } = this.props;
        if (expanded) {
            return (
                <CardSection>
                    <Text style={{ flex: 1 }}>
                        {library.description}
                    </Text>
                </CardSection>        
            );
        }
    }

    render() {
        const { titleStyle } = styles;
        const { id, title } = this.props.library;
        // console.log(this.props);

        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.selectLibrary(id)}
            >
                <View>
                    <CardSection>
                        <Text style={titleStyle}>
                            {title}
                        </Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        paddingLeft: 15,
        fontSize: 18
    },
    descriptionStyle: {
        paddingLeft: 15,
        paddingRight: 15
    }
  });

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;
    return { expanded };
    //return { selectedLibraryId: state.selectedLibraryId };
}; 

//export default connect(mapStateToProps, actionsCreators)(ListItem);
export default connect(mapStateToProps, actions)(ListItem);
