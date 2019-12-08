import React, { Component } from 'react';
import { Media, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import Api from '../../../api';

const defaultProps = {};

class CardDraft extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
      voting: {
        up: false,
        down: false
      },
      count: Number(this.props.votes)
    };
  }

  componentDidMount() {
    this.getIsFlagged();
    /* const { liked, disliked } = this.props;
    if (liked && disliked) {
      this.setState({
        voting: {
          up: liked.flagged,
          down: disliked.flagged
        }
      });
    } */
  }

  setContent() {
    return this.props.content;
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  }

  vote = async type => {
    const { id, uid, accessToken, refetch } = this.props;
    if (!uid) {
      this.setState({ error: true });

      setTimeout(() => this.setState({ error: false }), 2000);
    }

    const { voting } = this.state;
    const item = {
      type,
      action: voting[type === 'like' ? 'up' : 'down'] ? 'unflag' : 'flag',
      id,
      uid
    };
    const item2 = {
      type: type === 'like' ? 'dislike' : 'like',
      action: 'unflag',
      id,
      uid
    };
    await Api.post(`/qarar_api/flag?_format=json`, item2, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const response = await Api.post(`/qarar_api/flag?_format=json`, item, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.getIsFlagged();
    }
  };

  getIsFlagged = async () => {
    const { id, uid, accessToken } = this.props;
    const { voting } = this.state;
    const response = await Api.post(
      `/qarar_api/isflagged?_format=json`,
      {
        type: 'like',
        uid,
        id
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    const response2 = await Api.post(
      `/qarar_api/isflagged?_format=json`,
      {
        type: 'dislike',
        uid,
        id
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (response.ok && response2.ok) {
      this.setState({
        voting: {
          ...voting,
          up:
            response.data && response.data.data
              ? response.data.data.flagged
              : false,
          down:
            response2.data && response2.data.data
              ? response2.data.data.flagged
              : false
        }
      });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div className="side">
        <h5>أبدِ رأيك</h5>
        {error && <Alert color="danger">يجب ان تكون مسجل للتصويت</Alert>}
        <div className="like-dis">
          <div
            onClick={() => this.vote('like')}
            className={this.state.voting.up ? 'voting' : ''}
          >
            <Media
              object
              src={
                this.state.voting.up
                  ? '/static/img/Icon - dropdown - arrow down-white.svg'
                  : '/static/img/Icon - dropdown - arrow down.svg'
              }
            />
          </div>
          <div
            onClick={() => this.vote('dislike')}
            className={this.state.voting.down ? 'voting' : ''}
          >
            <Media
              object
              src={
                this.state.voting.down
                  ? '/static/img/Icon - dropdown - arrow down Copy-white.svg'
                  : '/static/img/Icon - dropdown - arrow down Copy.svg'
              }
            />
          </div>
        </div>

        <span className="vote">{this.state.count} صوت</span>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(CardDraft);
