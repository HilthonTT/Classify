using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Folders;
using MediatR;

namespace ClassifyApi.Handlers.Folders;

public class GetAllFoldersByOrgIdHandler : IRequestHandler<GetAllFoldersByOrgIdQuery, List<Folder>>
{
    private readonly IFolderData _folderData;

    public GetAllFoldersByOrgIdHandler(IFolderData folderData)
    {
        _folderData = folderData;
    }

    public async Task<List<Folder>> Handle(GetAllFoldersByOrgIdQuery request, CancellationToken cancellationToken)
    {
        List<Folder> folders = await _folderData.GetAllFoldersAsync(request.OrgId);

        return folders;
    }
}
