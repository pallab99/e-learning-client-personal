import ResultMolecules from '../../molecules/result/result.molecules';

const NotFoundPage = () => {
  return (
    <ResultMolecules
      status={'404'}
      title={'404'}
      subTitle={'Sorry, the page you visited does not exist.'}
      link="/"
    ></ResultMolecules>
  );
};

export default NotFoundPage;
