import {
  Button,
  HStack,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import AddNote from "./AddNote";
import Note, { NoteProps } from "./Note";

interface NoteViewProps {
  submissionId: string;
  notes: NoteProps["note"][];
}

export default function NoteView({ submissionId, notes }: NoteViewProps) {
  const [showAddNote, setShowAddNote] = useState(false);

  return (
    <Stack w="calc(50% - 80px)" pt={14}>
      <HStack>
        <Text fontSize="md" as="b">
          Notes
        </Text>
        <Spacer />
        <Button bg="white" color="#5F60FF" onClick={() => setShowAddNote(true)}>
          + Add Notes
        </Button>
      </HStack>
      <AddNote
        submissionId={submissionId}
        isVisible={showAddNote}
        onClose={() => setShowAddNote(false)}
      />
      {notes.length > 0 ? (
        <Stack divider={<StackDivider />}>
          {notes.map((note) => (
            <Note key={note._id.toString()} note={note} />
          ))}
        </Stack>
      ) : (
        <Text fontStyle="italic" pt={2}>
          No notes yet...
        </Text>
      )}
    </Stack>
  );
}
