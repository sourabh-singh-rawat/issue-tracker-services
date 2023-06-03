import ProjectService from '../services/ProjectService.js';

const index = async (req: any, res: any) => {
  const { uid } = req.user;

  // try {
  //   const { id } = await User.findOne(uid);
  //   const peopleRelatedToUid = await ProjectMember.findPeopleRelatedToUid(id);

  //   res.send({
  //     rows: peopleRelatedToUid.rows,
  //     rowCount: peopleRelatedToUid.rowCount,
  //   });
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const CollaboratorController = {
  index,
};

export default CollaboratorController;
