import React, { useEffect, useRef } from "react"
import { View, Animated } from "react-native"
import { COLORS } from "../../constants/theme"

interface ProgressBarProps {
	running: boolean
}

export default function ProgressBar({ running }: ProgressBarProps) {
	const width = useRef(new Animated.Value(0)).current

	useEffect(() => {
		if (running) {
			width.setValue(0)
			Animated.loop(
				Animated.sequence([
					Animated.timing(width, { toValue: 70, duration: 800, useNativeDriver: false }),
					Animated.timing(width, { toValue: 100, duration: 600, useNativeDriver: false }),
				])
			).start()
		} else {
			width.stopAnimation()
			width.setValue(0)
		}
	}, [running])

	return (
		<View style={{ height: 3, backgroundColor: COLORS.tertiary + "40", overflow: "hidden", borderRadius: 3 }}>
			<Animated.View style={{ height: 3, width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }), backgroundColor: COLORS.accent }} />
		</View>
	)
}


