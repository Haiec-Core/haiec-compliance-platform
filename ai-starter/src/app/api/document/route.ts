import type { ArtifactKind } from '@/components/artifact';
import { deleteDocumentsByIdAfterTimestamp, getDocumentsById, saveDocument } from '@/data/user/chat';
import { createSupabaseUserRouteHandlerClient } from '@/supabase-clients/user/createSupabaseUserRouteHandlerClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const workspaceId = searchParams.get('workspaceId');
  const user = await serverGetLoggedInUser();
  if (!id) {
    return new Response('Missing id', { status: 400 });
  }

  const supabaseClient = await createSupabaseUserRouteHandlerClient(); const { data: sessionData } = await supabaseClient.auth.getSession();

  if (!sessionData || !sessionData.session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const documents = await getDocumentsById({ id });

  const [document] = documents;

  if (!document) {
    return new Response('Not found', { status: 404 });
  }



  return Response.json(documents, { status: 200 });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const workspaceId = searchParams.get('workspaceId');
  if (!id) {
    return new Response('Missing id', { status: 400 });
  }

  const supabaseClient = await createSupabaseUserRouteHandlerClient(); const { data: sessionData } = await supabaseClient.auth.getSession();
  const user = await serverGetLoggedInUser();
  if (!sessionData || !sessionData.session) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!workspaceId) {
    return new Response('Missing workspaceId', { status: 400 });
  }

  const {
    content,
    title,
    kind,
  }: { content: string; title: string; kind: ArtifactKind } =
    await request.json();

  const documents = await getDocumentsById({ id });

  if (documents.length > 0) {
    const [document] = documents;

  }

  const document = await saveDocument({
    id,
    content,
    title,
    kind,
    workspaceId: workspaceId,
  });

  return Response.json(document, { status: 200 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const timestamp = searchParams.get('timestamp');

  if (!id) {
    return new Response('Missing id', { status: 400 });
  }

  if (!timestamp) {
    return new Response('Missing timestamp', { status: 400 });
  }

  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data: sessionData } = await supabaseClient.auth.getSession();
  const user = await serverGetLoggedInUser();
  if (!sessionData || !sessionData.session) {
    return new Response('Unauthorized', { status: 401 });
  }


  const documents = await getDocumentsById({ id });

  const [document] = documents;



  const documentsDeleted = await deleteDocumentsByIdAfterTimestamp({
    id,
    timestamp: new Date(timestamp),
  });

  return Response.json(documentsDeleted, { status: 200 });
}
