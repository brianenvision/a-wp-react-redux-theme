import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPost, fetchFrontPage} from '../actions/index';

import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

class Home extends Component {
    componentWillMount() {
        this.props.fetchFrontPage(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.fetchPost(nextProps.location.pathname);
        }
    }

    componentDidUpdate() {
        document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
    }

    render() {
        return (
            <section className="container-fluid template-single">
                <Header/>
                <Main />
                <Footer/>
            </section>
        );
    }
}


function mapStateToProps({posts}) {
    return {posts};
}

export default connect(mapStateToProps, {fetchPost, fetchFrontPage})(Home)