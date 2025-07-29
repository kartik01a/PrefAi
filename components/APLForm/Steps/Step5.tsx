import React from "react";
import { Text, TextInput, View } from "react-native";
import { Budget } from "../formData";
import { styles } from "./stepStyles";

interface Step5Props {
  budget: Budget;
  setBudget: (data: Partial<Budget>) => void;
}

export const Step5 = ({ budget, setBudget }: Step5Props) => {
  return (
    <View style={{ gap: 16 }}>
         <Text style={styles.heading}>Please attach a complete overall project budgetwith detailled expenses related to the presentation of the french artists.</Text>
         <Text style={styles.subHeading}>Budget Details</Text>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Shipping of the Works</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter shipping cost"
            value={budget.shippingOfTheWorks}
            onChangeText={(text) =>
              setBudget({ shippingOfTheWorks: text })
            }
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Insurance</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter insurance cost"
            value={budget.insurance}
            onChangeText={(text) => setBudget({ insurance: text })}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Per Diem of the Artists</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter per diem"
            value={budget.perDiemOfTheArtists}
            onChangeText={(text) =>
              setBudget({ perDiemOfTheArtists: text })
            }
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Travel</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter travel cost"
            value={budget.travel}
            onChangeText={(text) => setBudget({ travel: text })}
          />
        </View>
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Costs of Installing the Exhibition</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter installation cost"
          value={budget.costsOfInstallingTheExchibition}
          onChangeText={(text) =>
            setBudget({ costsOfInstallingTheExchibition: text })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Other</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter other costs"
          value={budget.other}
          onChangeText={(text) => setBudget({ other: text })}
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Total</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter total amount"
          keyboardType="number-pad"
          value={budget.total}
          onChangeText={(text) => setBudget({ total: text })}
        />
      </View>
    </View>
  );
};
