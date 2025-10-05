using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.IO;
using System.Reflection;
using System.Globalization;
using Algas.Domain.Mock;

public class OcorrenciaRepository
{
    private readonly string _connectionString;
    private readonly string _projectFilePacth;
    public OcorrenciaRepository()
    {
        _projectFilePacth = AppDomain.CurrentDomain.BaseDirectory;
        _connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Projeto\TerraSphere\Algas.Domain\algas.mdf;Integrated Security=True";
    }

    public void Add(OcorrenciaEntity ocorrencia)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var command = connection.CreateCommand();

        }
    }

    public OcorrenciaEntity GetById(int id)
    {
        var ocorrencia = new OcorrenciaEntity();
        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var command = connection.CreateCommand();
            command.CommandText = @"SELECT EventId,
                AnoOcorrencia,
                Cidade,
                Estado,
                LocalEspecifico,
                Latitude,
                Longitude,
                OndeOcorreu,
                TiposDeAlga,
                Fonte FROM OcorrenciaEntity WHERE Id = @EventId";
            command.Parameters.AddWithValue("@EventId", id);
            using (var reader = command.ExecuteReader())
            {
                if (reader.Read())
                {
                    ocorrencia = new OcorrenciaEntity
                    {
                        EventId = reader.GetInt32(reader.GetOrdinal("EventId")),
                        AnoOcorrencia = reader.GetInt32(reader.GetOrdinal("AnoOcorrencia")),
                        Cidade = reader.GetString(reader.GetOrdinal("Cidade")),
                        Estado = reader.GetString(reader.GetOrdinal("Estado")),
                        LocalEspecifico = reader.GetString(reader.GetOrdinal("LocalEspecifico")),
                        Latitude = reader.GetDouble(reader.GetOrdinal("Latitude")),
                        Longitude = reader.GetDouble(reader.GetOrdinal("Longitude")),
                        OndeOcorreu = reader.GetString(reader.GetOrdinal("OndeOcorreu")),
                        TiposDeAlga = reader.GetString(reader.GetOrdinal("TiposDeAlga")),
                        Fonte = reader.GetString(reader.GetOrdinal("Fonte"))
                    };
                }
            }
        }
        return ocorrencia;
    }

    public List<OcorrenciaEntity> GetAll()
    {
        var result = new OcorrenciasMock();
        return result.ListarOcorrencias();
    }

    public void Delete(int id)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var command = connection.CreateCommand();
            command.CommandText = @"DELETE FROM OcorrenciaEntity WHERE EventId = @EventId";
            command.Parameters.AddWithValue("@EventId", id);
            command.ExecuteNonQuery();
        }
    }
}
