using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Folders;

public class GetAllFoldersByOrgIdQuery : IRequest<List<Folder>>
{
    public string OrgId { get; set; }

    public GetAllFoldersByOrgIdQuery(string orgId)
    {
        OrgId = orgId;
    }
}
