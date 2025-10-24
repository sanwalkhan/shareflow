import React, { useRef, useEffect } from "react"
import { View, Text, ActivityIndicator, Animated, Platform } from "react-native"
import LottieView from "lottie-react-native"
import { COLORS } from "../../constants/theme"

interface LoaderOverlayProps {
	visible: boolean
	message?: string
}

export default function LoaderOverlay({ visible, message }: LoaderOverlayProps) {
	const fade = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(fade, { toValue: visible ? 1 : 0, duration: 200, useNativeDriver: true }).start()
	}, [visible])

	if (!visible) return null

	return (
		<Animated.View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: COLORS.neutral + "99",
				justifyContent: "center",
				alignItems: "center",
				opacity: fade,
				zIndex: 9999,
			}}
		>
			{Platform.OS === "web" ? (
				<ActivityIndicator size={32} color={COLORS.accent} />
			) : (
				<View style={{ width: 140, height: 140 }}>
					<LottieView source={require("../../../assets/Success.json")} autoPlay loop />
				</View>
			)}
			{message ? (
				<Text style={{ marginTop: 12, color: COLORS.white, fontWeight: "700" }}>{message}</Text>
			) : null}
		</Animated.View>
	)
}


