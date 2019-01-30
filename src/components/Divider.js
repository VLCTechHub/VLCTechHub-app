import React from "react"
import { View } from "react-native"

import STYLES from "../constants/styles"

export default (Divider = props => (
	<View
		style={{
			paddingTop: STYLES.SPACING.MAJOR,
			marginBottom: STYLES.SPACING.MAJOR,
			borderBottomWidth: 1,
			borderBottomColor: STYLES.COLORS.GREY_LIGHTER,
		}}
	/>
))
