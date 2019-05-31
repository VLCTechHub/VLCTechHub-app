import React from "react"
import { Animated, Image, View, Platform, AsyncStorage, StyleSheet } from "react-native"
import Onboarding from "react-native-onboarding-swiper"
import STYLES from "../../constants/styles"

import { BlurView } from "expo"
import { Feather, AntDesign } from "@expo/vector-icons"
import { iOSUIKit, material } from "react-native-typography"

export default class OnboardingScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    image1Opacity = new Animated.Value(0)
    image2Opacity = new Animated.Value(0)
    image3Opacity = new Animated.Value(0)

    componentDidMount() {
        Animated.timing(this.image1Opacity, { toValue: 0.5, duration: 3000 }).start()
    }

    render() {
        return (
            <View style={{ flex: 1, ...StyleSheet.absoluteFill }}>
                <Animated.Image
                    resizeMode="cover"
                    style={{
                        width: STYLES.WIDTH,
                        height: STYLES.HEIGHT,
                        opacity: this.image1Opacity,
                        ...StyleSheet.absoluteFill,
                    }}
                    source={require("../../../assets/onboarding-valencia.jpg")}
                />
                <Animated.Image
                    resizeMode="cover"
                    style={{
                        width: STYLES.WIDTH,
                        height: STYLES.HEIGHT,
                        opacity: this.image2Opacity,
                        ...StyleSheet.absoluteFill,
                    }}
                    source={require("../../../assets/onboarding-events.jpg")}
                />
                <Animated.Image
                    resizeMode="cover"
                    style={{
                        width: STYLES.WIDTH,
                        height: STYLES.HEIGHT,
                        opacity: this.image3Opacity,
                        ...StyleSheet.absoluteFill,
                    }}
                    source={require("../../../assets/onboarding-work.jpg")}
                />
                <View
                    style={{ backgroundColor: STYLES.COLORS.WHITE, opacity: 0.5, ...StyleSheet.absoluteFill }}
                />
                <Onboarding
                    showNext={false}
                    showSkip={false}
                    titleStyles={{
                        ...Platform.select({ ios: iOSUIKit.title3Emphasized, android: material.display1 }),
                        color: STYLES.COLORS.BLACK,
                        paddingTop: STYLES.HEIGHT / 3,
                    }}
                    subTitleStyles={{
                        ...Platform.select({ ios: iOSUIKit.subheadObject, android: material.subheading }),
                        color: STYLES.COLORS.BLACK,
                        width: STYLES.WIDTH / 1.5,
                    }}
                    imageContainerStyles={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        ...StyleSheet.absoluteFill,
                    }}
                    bottomBarColor="transparent"
                    onDone={() => {
                        AsyncStorage.setItem("onboardingPlayed", "true")
                        this.props.navigation.navigate("Drawer")
                    }}
                    pageIndexCallback={index => {
                        if (index === 0) {
                            Animated.timing(this.image1Opacity, { toValue: 0.5 }).start()
                            Animated.timing(this.image2Opacity, { toValue: 0 }).start()
                        }
                        if (index === 1) {
                            Animated.timing(this.image1Opacity, { toValue: 0 }).start()
                            Animated.timing(this.image2Opacity, { toValue: 0.5 }).start()
                            Animated.timing(this.image3Opacity, { toValue: 0 }).start()
                        }
                        if (index === 2) {
                            Animated.timing(this.image2Opacity, { toValue: 0 }).start()
                            Animated.timing(this.image3Opacity, { toValue: 0.33 }).start()
                        }
                    }}
                    pages={[
                        {
                            backgroundColor: "transparent",
                            image: (
                                <Image
                                    resizeMode="contain"
                                    style={{
                                        width: STYLES.WIDTH,
                                        height: STYLES.HEIGHT,
                                        ...StyleSheet.absoluteFill,
                                    }}
                                    source={require("../../../assets/splash-transparent.png")}
                                />
                            ),
                            title: "¡Hola!",
                            subtitle: "Bienvenido a la comunidad tecnológica de la ciudad de Valencia",
                        },
                        {
                            backgroundColor: "transparent",
                            image: <AntDesign name={`calendar`} size={150} color={STYLES.COLORS.PRIMARY} />,
                            title: "Descrube eventos",
                            subtitle:
                                "Entérate de los últimos eventos del sector de la tecnología en Valencia",
                        },
                        {
                            backgroundColor: "transparent",
                            image: <AntDesign name={`laptop`} size={150} color={STYLES.COLORS.PRIMARY} />,
                            title: "Ofertas de trabajo",
                            subtitle: "Encuentra empleo en las empresas digitales de la ciudad",
                        },
                    ]}
                />
            </View>
        )
    }
}
