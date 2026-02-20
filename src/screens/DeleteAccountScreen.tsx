import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Responsive } from '../utilities/Responsive'
import { Colors } from '../utilities/AppTheme'

const DeleteAccountScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <View style={[styles.header, { paddingTop: insets.top + Responsive.spacing[15] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={Responsive.fontSize[24]} color={Colors.text.inverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delete Account</Text>
        <View style={{ width: Responsive.spacing[40] }} />
      </View>

      <View style={styles.content}>
        <MaterialIcons name="warning" size={Responsive.fontSize[80]} color={Colors.status.error} />
        <Text style={styles.title}>Delete Your Account?</Text>
        <Text style={styles.subtitle}>
          This action cannot be undone. All your data including bookings, payment methods, and preferences will be permanently deleted.
        </Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>• All booking history will be lost</Text>
          <Text style={styles.warningText}>• Saved payment methods will be removed</Text>
          <Text style={styles.warningText}>• You won't be able to recover this account</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} activeOpacity={0.8}>
          <Text style={styles.deleteButtonText}>Yes, Delete My Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DeleteAccountScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Responsive.spacing[20], paddingBottom: Responsive.spacing[15], backgroundColor: Colors.primary },
  headerTitle: { fontSize: Responsive.fontSize[20], fontWeight: 'bold', color: Colors.text.inverse },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Responsive.spacing[30] },
  title: { fontSize: Responsive.fontSize[24], fontWeight: 'bold', color: Colors.text.primary, marginTop: Responsive.spacing[20], marginBottom: Responsive.spacing[15] },
  subtitle: { fontSize: Responsive.fontSize[14], color: Colors.text.secondary, textAlign: 'center', lineHeight: 22, marginBottom: Responsive.spacing[25] },
  warningBox: { width: '100%', backgroundColor: `${Colors.status.error}10`, borderRadius: Responsive.radius[12], padding: Responsive.padding[20], marginBottom: Responsive.spacing[30] },
  warningText: { fontSize: Responsive.fontSize[13], color: Colors.text.primary, marginBottom: Responsive.spacing[8] },
  deleteButton: { width: '100%', backgroundColor: Colors.status.error, paddingVertical: Responsive.padding[15], borderRadius: Responsive.radius[12], alignItems: 'center', marginBottom: Responsive.spacing[15] },
  deleteButtonText: { fontSize: Responsive.fontSize[16], fontWeight: '600', color: Colors.text.inverse },
  cancelButton: { width: '100%', paddingVertical: Responsive.padding[15], borderRadius: Responsive.radius[12], alignItems: 'center', borderWidth: 1, borderColor: Colors.border.default },
  cancelButtonText: { fontSize: Responsive.fontSize[16], fontWeight: '600', color: Colors.text.primary },
})
