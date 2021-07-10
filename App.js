import * as React from 'react';
import MapView, { Circle, Marker } from 'react-native-maps'; // Callout
import { StyleSheet,View, Dimensions } from 'react-native'; //Text

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



export default function App() {

const [pin, setPin] = React.useState({ 
  latitude: 47.608013,
  longitude: -122.335167,
})
const [region, setRegion] = React.useState({ 
  latitude: 47.608013,
  longitude: -122.335167,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
})

  return (
    <View style={{marginTop:50,flex:1}}>
      
  <GooglePlacesAutocomplete
      placeholder='search'
      fetchDetails={true}
 GooglePlacesSearchQuery={{
   rankby:"distance",

 }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
      console.log(data, details);
      setRegion({
        latitude:details.geometry.location.lat,
        longitude:details.geometry.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      }}
      query={{
        key: 'AIzaSyBcYH2Xhv6HQykiMlVmBGROtfapjKXHaCc',
        language: 'en',
        components:"country:us",
        types:"establishment",
        radius:30000,
        location:`${region.latitude}n,${region.longitude}`

      }}
      
      styles={{
      container:{flex:0 ,position:"absolute", width:"100%",zIndex:1},
      listView:{backgroundColor:"white"}
    }}
  
    />

      <MapView style={styles.map}  
      initialRegion={{
      // latitude: 37.78825,
      // longitude: -122.4324,
      latitude: 47.608013,
      longitude: -122.335167,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    provider= "google"

     >
       <Marker coordinate={{latitude:region.latitude, longitude:region.longitude}}/>
      
       <Marker 
    coordinate={pin} 
    pinColor ="black"
    draggable={true}
    onDragStart={(e)=>{
      console.log("Drag Start", e.nativeEvent.coordinates)
    }}
    
    onDragEnd={(e)=>{
      setPin({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
      })
    }}
      >
        
         {/* < Callout>
          < text> I am her </text>
          </Callout> */}
      </Marker>

       <Circle
        center={pin} radius={1000}/>
     </MapView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
});


