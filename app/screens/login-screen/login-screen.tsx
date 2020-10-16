import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native'
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const navigation: any = useNavigation();

  const onLogin = () => {
    let isValid = true
    if (!email) {
      isValid = false
      setEmailError("Please enter valid Email")
    } else if (!validateEmail(email)) {
      isValid = false
      setEmailError("Please enter valid Email")
    }
    if (!password) {
      isValid = false
      setPasswordError("Please enter valid Password")
    }
    if (isValid) {
      navigation.push('productList')
    }
  }


  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Pull in navigation via hook
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={styles.containerStyle}>
        <View style={styles.formOuterVireStyle}>
          <Text style={styles.welComeBackText}>Welcome back </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.signInText}>Sign in to continue</Text>
          </View>
          <View style={{ marginTop: 45 }}>
            <Text style={styles.labelTextStyle}>Email</Text>
            <TextInput
              style={styles.textInputStyle}
              value={email}
              returnKeyType={'next'}
              placeholderTextColor={'#ccc'}
              placeholder={'Enter your Email'}
              onChangeText={(text) => {
                setEmailError("")
                setEmail(text)
              }}
            />
            {emailError ? <Text style={{ fontSize: 13, color: 'red' }}>{emailError}</Text> : null}
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.labelTextStyle}>Password</Text>
            <TextInput
              style={ styles.textInputStyle}
              placeholder={'Enter your Password'}
              returnKeyType={'next'}
              secureTextEntry={true}
              placeholderTextColor={'#ccc'}
              value={password}
              onChangeText={(text) => {
                setPasswordError("")
                setPassword(text)
              }}
            />
            {passwordError ? <Text style={{ fontSize: 13, color: 'red' }}>{passwordError}</Text> : null}
          </View>
          <View style={{ alignSelf: 'flex-end', marginTop: 10 }}>
            <Text style={{ fontSize: 15, marginRight: 5 }}>Forgot password</Text>
          </View>
          <View style={{ marginTop: 100 }}>
            <TouchableOpacity
              style={styles.lofinButtonOuterView}
              onPress={() => onLogin()}>
              <Text style={styles.logintextStyle}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
})
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1, backgroundColor: 'white'
  },
  formOuterVireStyle: {
    marginTop: 90,
    marginHorizontal: 20,
  },
  welComeBackText: {
    fontSize: 25, color: '#ccc'
  },
  signInText: {
    fontSize: 13, color: '#ccc'
  },
  lofinButtonOuterView: {
    Width: 150, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DC1957', borderRadius: 5
  },
  logintextStyle: {
    color: 'white', textAlign: 'center', fontSize: 16
  },
  labelTextStyle:{
    fontSize: 18, color: '#585858'
  },
  textInputStyle:{
    borderBottomWidth: 1, borderBottomColor: '#ccc', height: 40, paddingHorizontal: -15
  }

});
