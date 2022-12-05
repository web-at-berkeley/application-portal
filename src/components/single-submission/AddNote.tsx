import {
  Stack,
  Text,
  HStack,
  Spacer,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

import { useMutation } from "../../../convex/_generated/react";

interface AddNoteProps {
  submissionId: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function AddNote({
  submissionId,
  isVisible,
  onClose,
}: AddNoteProps) {
  const addNote = useMutation("addNote");
  const [noteContents, setNoteContents] = useState("");

  function addNoteHandler() {
    addNote(submissionId, noteContents);
    setNoteContents("");
    onClose();
  }

  return (
    <Stack
      hidden={!isVisible}
      border="1px solid rgb(240, 241, 242)"
      borderRadius="15px"
      w="100%"
      paddingTop="10px"
    >
      <Text color="rgb(66, 67, 246)" paddingLeft="20px" as="b">
        Add Note
      </Text>
      <Textarea
        paddingLeft="20px"
        placeholder="Add a note..."
        border="none"
        focusBorderColor="none"
        value={noteContents}
        onChange={(e) => setNoteContents(e.target.value)}
      />
      <HStack
        backgroundColor="rgb(243, 242, 254)"
        padding="20px"
        borderTopRadius={0}
        borderBottomRadius="15px"
      >
        <Spacer />
        <Button
          backgroundColor="rgb(196, 196, 196)"
          color="rgb(0, 0, 0)"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          backgroundColor="rgb(196, 196, 196)"
          color="rgb(0, 0, 0)"
          onClick={addNoteHandler}
        >
          Add
        </Button>
      </HStack>
    </Stack>
  );
}
