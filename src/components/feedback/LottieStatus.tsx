import React, { useEffect, useRef } from "react"
import { View, Text, Animated } from "react-native"
import LottieView from "lottie-react-native"
import { COLORS } from "../../constants/theme"

interface LottieStatusProps {
	visible: boolean
	type: "success" | "error"
	message?: string
	onDone?: () => void
}

export default function LottieStatus({ visible, type, message, onDone }: LottieStatusProps) {
	const fade = useRef(new Animated.Value(0)).current
  const animationRef = useRef<LottieView | null>(null)

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
				backgroundColor: COLORS.neutral + "80",
				justifyContent: "center",
				alignItems: "center",
				opacity: fade,
				zIndex: 10000,
			}}
		>
			<View style={{ width: 160, height: 160, borderRadius: 16, overflow: "hidden", backgroundColor: "#00000020" }}>
        <LottieView
          ref={(r) => (animationRef.current = r)}
          source={type === "success" ? require("../../../assets/Success.json") : require("../../../assets/Cross.json")}
          autoPlay
          loop={false}
          onAnimationFinish={onDone}
        />
      </View>
			{message ? (
				<Text style={{ marginTop: 12, color: "#fff", fontWeight: "700" }}>{message}</Text>
			) : null}
		</Animated.View>
	)
}


