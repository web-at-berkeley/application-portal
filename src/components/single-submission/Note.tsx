import { HStack, Text, Stack, Spacer, Image } from "@chakra-ui/react";

import getNotes from "../../../convex/getNotes";

export interface NoteProps {
  note: NonNullable<Awaited<ReturnType<typeof getNotes>>>[number];
}

export default function Note({ note }: NoteProps) {
  return (
    <Stack padding={3}>
      <HStack marginBottom={-3}>
        <Image
          src={note.user.profilePic}
          borderRadius="full"
          boxSize="60px"
          alt="User profile picture"
          marginRight={4}
        />
        <Text fontSize="xl" as="b">
          {note.user.firstName + " " + note.user.lastName}
        </Text>
        <Spacer />
        <Text fontSize="sm" color="gray">
          {new Date(note._creationTime).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </Text>
      </HStack>
      <Text fontSize="md" paddingLeft="80px" paddingBottom={3}>
        {note.noteContents}
      </Text>
    </Stack>
  );
}
