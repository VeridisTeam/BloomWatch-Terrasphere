using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Algas.Api.Services
{
    [Route("api/ocorrencias")]
    [ApiController]
    public class OcorrenciaService
    {
        private readonly OcorrenciaCore _ocorrenciaCore;
        // HTTP endpoint definitions using ASP.NET Core minimal API or controller

        // Example using ASP.NET Core Controller
        [HttpGet]
        public ActionResult<List<OcorrenciaEntity>> GetAll()
        {
            return _ocorrenciaCore.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<OcorrenciaEntity> GetById(int id)
        {
            return _ocorrenciaCore.GetById(id);
        }



    }

}