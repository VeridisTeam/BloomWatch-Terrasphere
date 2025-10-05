using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algas.Domain.Mock
{
    class OcorrenciasMock
    {
        public List<OcorrenciaEntity>  ListarOcorrencias()
        {
            var ocorrencias = new List<OcorrenciaEntity>
        {
            new OcorrenciaEntity
            {
                EventId = 1,
                AnoOcorrencia = 2007,
                Cidade = "Fortaleza",
                Estado = "Ceará",
                LocalEspecifico = "Costa Marítima",
                Latitude = -3.694633,
                Longitude = -38.480491,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 2,
                AnoOcorrencia = 2025,
                Cidade = "Santarém",
                Estado = "Pará",
                LocalEspecifico = "Praias de Ponta de Pedras e Alter do Chão",
                Latitude = -2.504264,
                Longitude = -54.954643,
                OndeOcorreu = "Rio (água doce)",
                TiposDeAlga = "Cianobactérias (Chroococcales e Nostocales)",
                Fonte = "G1 Globo (14/03/2025)"
            },
            new OcorrenciaEntity
            {
                EventId = 3,
                AnoOcorrencia = 2024,
                Cidade = "Recife",
                Estado = "Pernambuco",
                LocalEspecifico = "Praia de Maracaípe",
                Latitude = -8.5255,
                Longitude = -35.007,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Microalga tóxica (associada a maré vermelha)",
                Fonte = "G1 Globo (02/02/2024)"
            },
            new OcorrenciaEntity
            {
                EventId = 4,
                AnoOcorrencia = 2024,
                Cidade = "Tamandaré",
                Estado = "Pernambuco",
                LocalEspecifico = "Praias do litoral sul",
                Latitude = -8.74845,
                Longitude = -35.1039,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Microalga tóxica (associada a maré vermelha)",
                Fonte = "G1 Globo (02/02/2024)"
            },
            new OcorrenciaEntity
            {
                EventId = 5,
                AnoOcorrencia = 2024,
                Cidade = "Barra de Santo Antônio",
                Estado = "Alagoas",
                LocalEspecifico = "Praia de Carro Quebrado",
                Latitude = -9.35035,
                Longitude = -35.46638,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Algas de cor avermelhada (associada a maré vermelha)",
                Fonte = "G1 Globo (02/02/2024)"
            },
            new OcorrenciaEntity
            {
                EventId = 6,
                AnoOcorrencia = 2024,
                Cidade = "Cabo Frio",
                Estado = "Rio de Janeiro",
                LocalEspecifico = "Praia do Forte",
                Latitude = -22.887286,
                Longitude = -42.018289,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Algas em grande quantidade",
                Fonte = "G1 Globo (02/02/2024)"
            },
            new OcorrenciaEntity
            {
                EventId = 7,
                AnoOcorrencia = 2007,
                Cidade = "Ilha dos Gatos",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.806711,
                Longitude = -45.671792,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 8,
                AnoOcorrencia = 2007,
                Cidade = "Ilha das Couves",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.424674,
                Longitude = -44.852371,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 9,
                AnoOcorrencia = 2007,
                Cidade = "Cigarras",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.730314,
                Longitude = -45.39923,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 10,
                AnoOcorrencia = 2007,
                Cidade = "Bom Abrigo",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -25.119218,
                Longitude = -47.864999, // Corrigido: longitude original estava mal formatada
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 11,
                AnoOcorrencia = 2007,
                Cidade = "Sítio Grande",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -24.04353,
                Longitude = -46.488864,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 12,
                AnoOcorrencia = 2007,
                Cidade = "Praia Do Tombo",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -24.01462,
                Longitude = -46.27209,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },

            new OcorrenciaEntity
            {
                EventId = 13,
                AnoOcorrencia = 2007,
                Cidade = "Grajaú",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.770692,
                Longitude = -46.656367,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },

            new OcorrenciaEntity
            {
                EventId = 14,
                AnoOcorrencia = 2007,
                Cidade = "Pereirinha",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -25.063892,
                Longitude = -47.91287,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },

            new OcorrenciaEntity
            {
                EventId = 15,
                AnoOcorrencia = 2007,
                Cidade = "Guarau",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -24.370956,
                Longitude = -47.012637,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },

            new OcorrenciaEntity
            {
                EventId = 16,
                AnoOcorrencia = 2007,
                Cidade = "Cibratel",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -24.214091,
                Longitude = -46.822312,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },

            new OcorrenciaEntity
            {
                EventId = 17,
                AnoOcorrencia = 2007,
                Cidade = "Sonhos",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -24.194432,
                Longitude = -46.798295,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 18,
                AnoOcorrencia = 2007,
                Cidade = "Porchat",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.983255,
                Longitude = -46.366972,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },

            new OcorrenciaEntity
            {
                EventId = 19,
                AnoOcorrencia = 2007,
                Cidade = "Tombo",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -24.01497,
                Longitude = -46.272711,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },

            new OcorrenciaEntity
            {
                EventId = 20,
                AnoOcorrencia = 2007,
                Cidade = "Guaiuba",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -24.018323,
                Longitude = -46.292512,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },

            new OcorrenciaEntity
            {
                EventId = 21,
                AnoOcorrencia = 2007,
                Cidade = "Tijucopava",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = 23.913182, // valor positivo conforme fornecido
                Longitude = -46.168209,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },

            new OcorrenciaEntity
            {
                EventId = 22,
                AnoOcorrencia = 2007,
                Cidade = "São Lourenço",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.792643,
                Longitude = -45.991192,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 34,
                AnoOcorrencia = 2007,
                Cidade = "Enseada",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.986931,
                Longitude = -46.215705,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 35,
                AnoOcorrencia = 2007,
                Cidade = "Baleia",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.776517,
                Longitude = -45.668023,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 36,
                AnoOcorrencia = 2007,
                Cidade = "Toque Toque Grande",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.833946,
                Longitude = -45.511214,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 37,
                AnoOcorrencia = 2007,
                Cidade = "Fortaleza",
                Estado = "Ceará",
                LocalEspecifico = "Costa Marítima",
                Latitude = -3.694633,
                Longitude = -38.480491,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 38,
                AnoOcorrencia = 2007,
                Cidade = "Lamberto",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.496878,
                Longitude = -45.111172,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 39,
                AnoOcorrencia = 2007,
                Cidade = "Engenho",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.764523,
                Longitude = -45.780813,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 40,
                AnoOcorrencia = 2007,
                Cidade = "Almada",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.360799,
                Longitude = -44.888503,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 41,
                AnoOcorrencia = 2007,
                Cidade = "Ilha da Rapada",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.160239,
                Longitude = -44.665107,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 42,
                AnoOcorrencia = 2007,
                Cidade = "Praia Das Conchas",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.386695,
                Longitude = -44.962503,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 43,
                AnoOcorrencia = 2007,
                Cidade = "Ilha Anchieta",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.553265,
                Longitude = -45.058513,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            },
            new OcorrenciaEntity
            {
                EventId = 44,
                AnoOcorrencia = 2007,
                Cidade = "Ponta da Sela",
                Estado = "São Paulo",
                LocalEspecifico = "Costa Marítima",
                Latitude = -23.883659,
                Longitude = -45.46277,
                OndeOcorreu = "Costa Marítima",
                TiposDeAlga = "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
                Fonte = "Lilian Mós Blois Crispino (2007)"
            }



        };
            return ocorrencias;
        }
    }
}
