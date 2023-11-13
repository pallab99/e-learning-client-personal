import ResultMolecules from '../../molecules/result/result.molecules';

const UnauthorizedPage = () => {
  return (
    <ResultMolecules
      status={'403'}
      title={'403'}
      subTitle="Sorry, you are not authorized to access this page."
      link="/"
    />
  );
};

export default UnauthorizedPage;
