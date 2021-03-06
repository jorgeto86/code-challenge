import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import '../../../theme/Card.css'

import request from '../../../request';
import { deleteArticle, updateArticle } from '../../../queries';

import { removeCard } from '../actions'

import Button from '../../Button'


class Card extends Component {

  deleteArticle = (id) => {
    request(deleteArticle(id)).then(response => {
      this.props.removeCard(id);
    });
  }

  updateArticle = (id) => {
    request(updateArticle(id)).then(response => {
      console.log(response)
    });
  }

  editCard = () => {
    browserHistory.push(`article/${this.props.id}/edit`)
  }

  openCard = () => {
    browserHistory.push(`article/${this.props.id}`)
  }

  // Renders
  render() {
    const {
      id,
      author,
      excerpt,
    } = this.props;
    return (
      <div className="card" >
        <div onClick={this.openCard}>
          <h4>{author}</h4>
          <p>{excerpt}</p>
        </div>
        <Button
          name={ 'Delete' }
          onClick={ () => this.deleteArticle(id) }
        />
        <Button
          name={ 'Edit' }
          onClick={ () => this.editCard() }
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeCard}, dispatch);
}

export default connect(null, mapDispatchToProps)(Card);
