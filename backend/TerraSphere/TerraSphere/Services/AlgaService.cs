using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Algas.Api.Services
{
    [ApiController]
    [Route("api/ocorrencias")]
    public class OcorrenciaService
    {
        // HTTP endpoint definitions using ASP.NET Core minimal API or controller

        // Example using ASP.NET Core Controller
        [HttpGet]
        public ActionResult<List<OcorrenciaEntity>> GetAll()
        {
            var ocorrenciaCore = new OcorrenciaCore();
            return ocorrenciaCore.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<OcorrenciaEntity> GetById(int id)
        {
            var ocorrenciaCore = new OcorrenciaCore();
            return ocorrenciaCore.GetById(id);
        }



    }

}