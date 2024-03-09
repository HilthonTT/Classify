using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Folders;

public class GetFoldersByOrgIdQuery : IRequest<List<Folder>>
{
    public string OrgId { get; set; }

    public GetFoldersByOrgIdQuery(string orgId)
    {
        OrgId = orgId;
    }
}
