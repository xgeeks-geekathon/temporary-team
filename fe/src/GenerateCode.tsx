import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from './components/Context';
import Title from './components/Title';
import CodeItem from './components/CodeItem';

function GenerateCode() {
  const navigate = useNavigate();
  const { state } = useMyContext();

  return (
    <>
      <Title />
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Back
      </Button>

      {state.activeIssue && (
        <>
          <Typography variant="h6">{state.activeIssue.title}</Typography>

          <CodeItem>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout.
          </CodeItem>

          <CodeItem>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look even slightly believable.
          </CodeItem>

          <CodeItem>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </CodeItem>

          <CodeItem>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </CodeItem>

          <CodeItem>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </CodeItem>

          <CodeItem>
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
            using 'Content here, content here', making it look like readable English
          </CodeItem>
        </>
      )}
    </>
  );
}

export default GenerateCode;
