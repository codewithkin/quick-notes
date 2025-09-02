import { Stack } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

const dummyNotes = [
  {
    id: 1,
    title: "Hey there",
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Howdie bro !",
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Hello !",
    createdAt: new Date()
  }
]

export default function Index() {
  const newNote = async () => {
    try {
      // make a request to the backend
      const res = await axios.post(`${process.env.API_URL}/notes`);

      if(res.status !== 201) {
        Alert.alert("Failed to create new note");
      }

      Alert.alert("Note created successfully");

      return res.data;
    } catch (e) {
      console.log("An error occured while creating note: ", e);
      Alert.alert("An error occured while creating note");
    }
  }
  
  const [notes, setNotes] = useState<null | any[]>(null);

  useEffect(() => {
     const fetchNotes = async () => {
    const res = await axios.get(`${process.env.API_URL}/notes`);

    if(res.status !== 200) {
      setNotes([]);

      Alert.alert("An error occured while fetching your notes");
    }

    setNotes(res.data);

    return res.data
  }

    (async () => {
      await fetchNotes();
    })();
  })

  const [title, setTitle] = useState("");

  console.log("Notes: ", notes);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "Quick Notes",
          headerTitleAlign: "center"
        }}
      />
      <Text style={styles.heading}>All your notes</Text>

      <View style={styles.noteContainer}>
        {
          !notes && (
            <Text>Fetching notes...</Text>
          )
        }
        {
          notes && notes.length < 1 && (
            <Text>No notes yet</Text>
          )
        }
        {
          notes && notes.length > 0 && notes.map((note: any, i: number) => (
            <View key={i} style={styles.note}>
              <Text style={{fontWeight: 800 }}>{note.id}</Text>
              <Text style={{fontWeight: 800}}>{note.title}</Text>
            </View>
          ))
        }
      </View>

      <View style={{
        marginTop: 24
      }}>
        <Text style={styles.heading2}>Create a new note</Text>

        <TextInput
          placeholder="Please enter note title..."
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Pressable 
        onPress={async () => {
          await newNote()
        }}
        style={styles.button}>
          <Text style={{
            color: "white",
            fontWeight: 800,
          }}>Create new note</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "800",  
    textAlign: "center"
  },
  heading2: {
    fontSize: 16,
    fontWeight: "600",  
    textAlign: "center",
    marginBottom: 8
  },
  noteContainer: {
    marginTop: 16,
    paddingHorizontal: 24
  },
  note: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "gray"
  },
  input: {
    borderWidth: 1,
    width: 300,
    borderColor: "lightgray",
    borderRadius: 12,
    padding: 12
  },
  button: {
    borderRadius: 12,
    backgroundColor: "blue",
    padding: 20,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center"
  }
})