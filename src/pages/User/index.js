import React from 'react';

import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnwerAvatar, Info, Title, Author } from './styles';

import PropTypes from 'prop-types';
import api from '~/services/api';

export default class Main extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name,
    });

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func
        }).isRequired
    };

    state = {
        stars: [],
    }

    async componentDidMount(){
        const {navigation} = this.props;
        const user = navigation.getParam('user');

        const response = await api.get(`/users/${user.login}/starred`);

        this.setState({ stars: response.data })
    }

    render () {
        const {navigation} = this.props;
        const {stars} = this.state;

        const user = navigation.getParam('user');

        return(
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name> {user.name} </Name>
                    <Bio> {user.bio} </Bio>
                </Header>

                
                <Stars 
                    data={stars}
                    keyExtrator={star => String(star.id)}
                    renderItem={({ item }) => (
                        <Starred>
                            <OwnwerAvatar source={{uri: item.owner.avatar_url}} />
                            <Info>
                                <Title> {item.name} </Title>
                                <Author> {item.owner.login} </Author>
                            </Info>
                        </Starred>
                    )}
                />
                
            </Container>
        )
    };
}
