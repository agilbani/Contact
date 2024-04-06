/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import LoadingManager from '../utils/LoadingManager';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    LoadingManager.setInstance({ show: this.show, hide: this.hide });
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      visible && (
        <View style={styles.page}>
          <ActivityIndicator color="red" size="large" />
        </View>
      )
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
});
