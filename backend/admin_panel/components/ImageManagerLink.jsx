import React from 'react';
import { Box, Button, Text, Icon } from '@adminjs/design-system';

const ImageManagerLink = () => {
  const handleOpen = () => {
    window.open('/welfare-board/api/upload', '_blank');
  };

  return (
    <Box variant="white" p="xl" style={{ textAlign: 'center', maxWidth: '500px', margin: '60px auto' }}>
      <Icon icon="Image" size={48} color="primary100" />
      <Text variant="title" mt="lg">Image Manager</Text>
      <Text variant="sm" color="grey60" mt="sm" mb="xl">
        Upload, view, and manage images stored on the SWC server.
        Images are served at <strong>https://swc.iitg.ac.in/welfare-board/api/&lt;filename&gt;</strong>.
      </Text>
      <Button onClick={handleOpen} variant="contained">
        Open Image Upload Portal ↗
      </Button>
      <Text variant="xs" color="grey40" mt="md">
        The portal will open in a new tab. Use the same admin credentials to log in.
      </Text>
    </Box>
  );
};

export default ImageManagerLink;
