import { useState } from 'react';
import Button from '@mui/material/Button';

import IconifyIcon from 'components/base/IconifyIcon';
import { Popup } from './Popup';
import Userform from './Userform';


export default function BasicModal() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen} sx={{ borderRadius: 20, marginRight: 2 }}>
        <div className="add-img" style={{ display: 'flex', gap: '6px', padding: "7px 20px 7px 15px" }}>
          <IconifyIcon
            icon="gridicons:plus-small"
            color="#ffffff"
            fontSize="1.5rem"
          />
          <h5>Add Blogs</h5>
        </div>
      </Button>
      <Popup open={open} onClose={handleClose}  >
        <Userform onClose={handleClose} />
      </Popup>
    </div>
  );
}
