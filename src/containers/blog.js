import React, {Component} from 'react';
import {connect, dispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchPosts, ROUTER} from '../actions/index';

import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

class Blog extends Component {
    componentDidMount() {
        this.props.fetchPosts(this.props.match.params.pageNum || 1);
        this.props.dispatch({
           type: ROUTER,
           payload: this.props.match
        });
    }

    componentDidUpdate(nextProps) {
        document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
        if (this.props.match.params.pageNum !== nextProps.match.params.pageNum || this.props.location.pathname !== nextProps.location.pathname) {
            this.props.fetchPosts(nextProps.match.params.pageNum || 1);
            this.props.dispatch({
                type: ROUTER,
                payload: nextProps.match
            });
        }
    }

    render() {
        return (
            <section className="container-fluid template-blog">
                <Header/>
                <Main/>
                <Footer/>
            </section>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({fetchPosts, dispatch}), dispatch)
}

export default connect(null, mapDispatchToProps)(Blog)