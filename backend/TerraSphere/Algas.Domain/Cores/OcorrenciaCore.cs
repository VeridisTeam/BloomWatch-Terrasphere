using System.Collections.Generic;

public class OcorrenciaCore
{
    private OcorrenciaRepository _repository;

    public  OcorrenciaEntity GetById(int id)
    {
        var repository = new OcorrenciaRepository();
        return repository.GetById(id);
    }

    public  List<OcorrenciaEntity> GetAll()
    {
        var repository = new OcorrenciaRepository();
        return repository.GetAll();
    }

}