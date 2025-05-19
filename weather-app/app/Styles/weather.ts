import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   opacity: 0.8,
   
  },
  
    weatherProperties: {
    borderRadius: 16,
    padding: 16,
     backgroundColor: "grey", 
  },
  location: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  topCard: {
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFD43B",
    marginBottom: 8,
    
  },
  tempText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#FFFFFF",

  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 5,
    
  },
  tempRange: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
  },
  rangeText: {
    fontSize: 16,
    color: "#FFD43B",
  },

  // forecastTemperature: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "#FFFFFF",
  //   backgroundColor: "#7E5CFF",
  //   borderRadius: 8,
  //   margin: 4,
  //   padding: 4,
  // },
weatherTextcontainer: {
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent purple
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 16,
  marginHorizontal: 6,
  marginVertical: 8,
  flexDirection: 'row',
  alignItems: 'center',
},
});

export default styles;
