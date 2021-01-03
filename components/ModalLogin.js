import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import styled from "styled-components";
import { BlurView } from "expo-blur";
import { Keyboard, Alert, Animated, Dimensions } from "react-native";
import Success from "./Success";
import Loading from "./Loading";
import { connect } from "react-redux";

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeLogin: () =>
      dispatch({
        type: "CLOSE_LOGIN",
      }),
  };
}
class ModalLogin extends React.Component {
  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),
    isSuccessful: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0),
  };

  componentDidUpdate() {
    if (this.props.action === "openLogin") {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.scale, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
      Animated.timing(this.state.translateY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
    if (this.props.action === "closeLogin") {
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight,
          useNativeDriver: false,
          duration: 0,
        }).start();
        Animated.spring(this.state.scale, {
          toValue: 1.3,
          useNativeDriver: false,
        }).start();
      }, 1000);
    }
  }

  handleLogin = () => {
    Keyboard.dismiss();

    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({ isLoading: false, isSuccessful: true });
      Alert.alert("Congrats", "You've Logged successfully!");

      setTimeout(() => {
        this.props.closeLogin();
        this.setState({ isSuccessful: false });
      }, 2000);
    }, 2000);
  };

  focusEmail = () => {
    this.setState({
      iconEmail: require("../assets/icon-email-animated.gif"),
      iconPassword: require("../assets/icon-password.png"),
    });
  };
  focusPassword = () => {
    this.setState({
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password-animated.gif"),
    });
  };

  tabBack = () => {
    Keyboard.dismiss();
    this.props.closeLogin();
  };

  // this.focusPassword = this.focusPassword.bind(this)
  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.tabBack();
          }}
          style={{
            height: screenHeight / 2 - 370,
            width: "100%",
          }}>
          <BlurView
            tint="dark"
            intensity={1000}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </TouchableWithoutFeedback>
        <Modal>
          <Logo source={require("../assets/logo-dc.png")} />
          <Text>Start Learning. Access Pro Content.</Text>
          <TextInput
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            keyboardType="email-address"
            onFocus={this.focusEmail}
          />
          <TextInput
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
            onFocus={this.focusPassword}
          />
          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.iconPassword} />
          <TouchableOpacity onPress={this.handleLogin}>
            <Button>
              <ButtonText>Log in</ButtonText>
            </Button>
          </TouchableOpacity>
        </Modal>
        {this.state.isSuccessful && (
          <Success isActive={this.state.isSuccessful} />
        )}
        {this.state.isLoading && <Loading isActive={this.state.isLoading} />}
        <TouchableWithoutFeedback
          onPress={() => {
            this.tabBack();
          }}>
          <TouchableOpacity>
            <Text>close</Text>
          </TouchableOpacity>
          <BlurView
            tint="default"
            intensity={100}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </TouchableWithoutFeedback>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;

const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;
