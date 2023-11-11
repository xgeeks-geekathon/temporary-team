import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from './components/Context';
import Title from './components/Title';
import BoilerplateItem from './components/BoilerplateItem';

function Boilerplate() {
  const navigate = useNavigate();
  const { state } = useMyContext();

  return (
    <>
      <Title />
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Back
      </Button>

      {state.issues && state.activeIssue !== undefined && (
        <>
          <Typography variant="h6">{state.issues[state.activeIssue].title}</Typography>
          <BoilerplateItem>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout.
          </BoilerplateItem>
          <BoilerplateItem>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </BoilerplateItem>
          <BoilerplateItem>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </BoilerplateItem>
          <BoilerplateItem>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </BoilerplateItem>
          <BoilerplateItem>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </BoilerplateItem>
          <BoilerplateItem>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </BoilerplateItem>
          <BoilerplateItem>
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
            using 'Content here, content here', making it look like readable English
          </BoilerplateItem>
        </>
      )}
    </>
  );
}

export default Boilerplate;
