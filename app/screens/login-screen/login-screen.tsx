import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, KeyboardAvoidingView, View, TextInput, TouchableOpacity, ViewStyle, Alert } from 'react-native'
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const [email, setEmail] = useState("test@mail.com");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("123");
  const navigation: any = useNavigation();

  const onLogin = () => {
    let isValid = true
    if (!email) {
      isValid = false
      setEmailError("Please Enter Valid Email")
    } else if (!validateEmail(email)) {
      isValid = false
      setEmailError("Please Enter Valid Email")
    }
    if (!password) {
      isValid = false
      setPasswordError("Please Enter Valid Password")
    }
    if (isValid) {
      navigation.push('productList')
    }
  }


  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{
          marginTop: 90,
          marginHorizontal: 20,
        }}>
          <Text style={{ fontSize: 25, color: '#ccc' }}>Welcome back </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 13, color: '#ccc' }}>Sign in to continue</Text>
          </View>
          <View style={{ marginTop: 45 }}>
            <Text style={{ fontSize: 18, color: '#585858' }}>Username</Text>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', height: 40, paddingHorizontal: -15 }}
              value={email}
              returnKeyType={'next'}
              // ref={ref => (this.email = ref)}
              placeholderTextColor={'#ccc'}
              // onSubmitEditing={() => {
              //     this.password.focus();
              //   }}
              //   onFocus={() => {
              //     this.email;
              //   }}
              placeholder={'Enter your Email'}
              onChangeText={(text) => {
                setEmailError("")
                setEmail(text)
              }}
            />
            {emailError ? <Text style={{ fontSize: 13, color: 'red' }}>{emailError}</Text> : null}
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: '#585858' }}>Password</Text>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', height: 40, paddingHorizontal: -15 }}
              placeholder={'Enter your Password'}
              returnKeyType={'next'}
              // ref={ref => (this.password = ref)}
              secureTextEntry={true}
              placeholderTextColor={'#ccc'}
              value={password}
              // onFocus={() => {
              //     this.password;
              //   }}
              //   onSubmitEditing={()=>{
              //     Keyboard.dismiss()
              //   }}
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
              style={{
                Width: 150, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DC1957', borderRadius: 5
              }}
              onPress={() => onLogin()}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
})
