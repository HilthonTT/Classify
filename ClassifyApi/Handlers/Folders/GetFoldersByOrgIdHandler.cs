using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Folders;
using MediatR;

namespace ClassifyApi.Handlers.Folders;

public class GetFoldersByOrgIdHandler : IRequestHandler<GetFoldersByOrgIdQuery, List<Folder>>
{
    private readonly IFolderData _folderData;

    public GetFoldersByOrgIdHandler(IFolderData folderData)
    {
        _folderData = folderData;
    }

    public async Task<List<Folder>> Handle(GetFoldersByOrgIdQuery request, CancellationToken cancellationToken)
    {
        List<Folder> folders = await _folderData.GetAllFoldersAsync(request.OrgId);

        return folders;
    }
}
